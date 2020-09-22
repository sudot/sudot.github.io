hexo.extend.filter.register('before_post_render', function (data) {
  var source = data.source;
  var fileName = source.substring(source.lastIndexOf('/') + 1, source.lastIndexOf('.'));
  // 转义 ()[]. 等符号
  fileName = fileName.replace(/([\(\)\[\]\.])/g, '\\$1')
  var regExp = RegExp(fileName + '\\/([^\\\\\\/\\:\\*\\?\\"\\<\\>\\|\\,\\)]+)', 'g');
  if (data.top_img) {
    data.top_img = data.top_img.replace(regExp, data.path + '$1');
  }
  if (data.cover) {
    data.cover = data.cover.replace(regExp, data.path + '$1');
  }
  var regExp = RegExp('!\\[([^\\f\\n\\r\\t\\v\\[\\]]*)\\]\\(' + fileName +
    '\\/([^\\\\\\/\\:\\*\\?\\"\\<\\>\\|\\,\\)]+)\\)', 'g');
  data.content = data.content.replace(regExp, '{%asset_img $2 %}');
  return data;
});