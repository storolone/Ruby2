import { assetSlots } from './catalog';
import { sections } from './sections';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const knownSections = new Set<string>(sections.map(([value]) => value));
export const cmsConfigured = !!projectId && /^[a-z0-9]+$/.test(projectId) && /^[a-z0-9_-]+$/.test(dataset);

export type Media = { id: string; section: string; paths: string[]; caption: string; replaces?: string };

export function mediaSrc(media: Media[], basePath: string, original: string) {
  return media.find(item => item.replaces === original)?.paths[0] ?? basePath + original;
}

function imageUrl(value: unknown) {
  const prefix = `https://cdn.sanity.io/images/${projectId}/${dataset}/`;
  if (typeof value !== 'string' || !value.startsWith(prefix)) return null;
  const file = value.slice(prefix.length);
  if (!/^[a-z0-9]+-\d+x\d+\.(jpg|jpeg|png|webp|avif)$/i.test(file)) return null;
  return `${value}?w=1800&fit=max&auto=format`;
}

export async function readMedia(signal?: AbortSignal): Promise<Media[]> {
  if (!cmsConfigured) return [];
  const query = `*[_type in ["rubyPhoto", "rubyPhotoSlot"] && !(_id in path("drafts.**")) && !(_id in path("versions.**"))]
    | order(_createdAt asc, _id asc) {
      "id": _id, _type, section, caption,
      "main": image.asset->url, "before": before.asset->url, "after": after.asset->url
    }`;
  const params = new URLSearchParams({query, perspective: 'published'});
  const response = await fetch(`https://${projectId}.apicdn.sanity.io/v2025-02-19/data/query/${dataset}?${params}`, {signal});
  if (!response.ok) throw new Error('Görseller alınamadı.');
  const {result} = await response.json() as {result: Record<string, unknown>[]};
  return result.flatMap(row => {
    if (row._type === 'rubyPhotoSlot') {
      const slot = assetSlots.find(item => item.id === row.id);
      const url = imageUrl(row.main);
      return slot && url ? [{id: slot.id, section: '', paths: [url], caption: '', replaces: slot.path}] : [];
    }
    if (typeof row.id !== 'string' || typeof row.section !== 'string' || !knownSections.has(row.section)) return [];
    const urls = row.section === 'scalp' ? [imageUrl(row.before), imageUrl(row.after)] : [imageUrl(row.main)];
    const paths = urls.filter((url): url is string => url !== null);
    if (paths.length !== urls.length) return [];
    return [{id: row.id, section: row.section, paths, caption: typeof row.caption === 'string' ? row.caption : ''}];
  });
}
