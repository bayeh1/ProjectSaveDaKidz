const modules = import.meta.glob<string>('./*.jpg', { eager: true, query: '?url', import: 'default' });

const imageMap: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  imageMap[path.replace('./', '')] = url;
}

export default imageMap;
