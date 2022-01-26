export const create_quill = (
  id: string,
  toolbar: 'false' | string,
  clipboard: string,
  placeholder: string,
  theme: 'snow' | 'bubble',
  customFonts: Array<string> = [],
  customJS: string
) => {
  let font = '';
  if (customFonts.length > 0) {
    const fontList = "'" + customFonts.join("','") + "'";
    font = `
    // Add fonts to whitelist
    var Font = Quill.import('formats/font');
    Font.whitelist = [${fontList}];
    Quill.register(Font, true);

    `;
  }
  let clipboardModule = '';
  if (clipboard) {
    clipboardModule = `clipboard: ${clipboard},`;
  }

  return `
  <script>

  ${font}
  ${customJS}

  var sendMessage = function (message) {
    if (window.ReactNativeWebView)
      window.ReactNativeWebView.postMessage(message);
      else console.log(message)
  }

  const mention = {
    source: function(searchTerm, renderList, mentionChar) {
      const eventName = 'mention-change'

      var getEditorChange = JSON.stringify({
        type: eventName,
        data: { eventName, args: { searchTerm, mentionChar } }
      });

      sendMessage(getEditorChange);
    }
  }

  var quill = new Quill('#${id}', {
    modules: {
      mention: mention,
      toolbar: ${toolbar},
      ${clipboardModule}
    },
    placeholder: '${placeholder}',
    theme: '${theme}'
  });

  </script>
  `;
};
