const path = require('path')

hexo.extend.filter.register('before_post_render', function (data) {
  if (!data.slug) return
  const folder = data.slug.substring(0, data.slug.lastIndexOf('/'))
  const regExp = RegExp('\\[(.*)\\]\\((.*)\\.md\\)', 'g')
  for (const group of data.content.matchAll(regExp)) {
    if (group[2].startsWith('http')) continue
    const filePath = path
      .resolve('__posts__', folder, group[2])
      .split('__posts__')
      .filter((v) => v)
      .pop()
      .replaceAll(path.sep, '/')
      .substring(1)
    const replaceValue = `{% post_link ${filePath} ${group[1]} %}`
    data.content = data.content.replace(group[0], replaceValue)
  }
  return data
})
