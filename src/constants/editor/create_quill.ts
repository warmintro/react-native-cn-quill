export const create_quill = (
  id: string,
  toolbar: 'false' | string,
  clipboard: string,
  placeholder: string,
  theme: 'snow' | 'bubble',
  customFonts: Array<string> = [],
  customJS: string,
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

  try {
    require("quill-mention");
  } catch (e) {
    alert(e.message || '')
  }

  var quill = new Quill('#${id}', {
    modules: {
      toolbar: ${toolbar} ,
      ${clipboardModule},
      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@", "#"],
        source: function(searchTerm, renderList, mentionChar) {
          var getEditorChange = JSON.stringify({
            type: 'mention-source',
            data: { eventName: 'mention-source', args: { searchTerm, renderList, mentionChar } }
          });
          sendMessage(getEditorChange);
        }
      }
    },
    placeholder: '${placeholder}',
    theme: '${theme}'
  });
  </script>
  `;
};
