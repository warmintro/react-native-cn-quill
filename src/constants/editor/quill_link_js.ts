export const quill_link_js = () => `
  <script>
    var Embed = Quill.import('blots/embed')

    class AttachmentBlot extends Embed {
      static create(value) {
        var node = super.create()

        node.setAttribute('href', value.url)
        node.setAttribute('target', '_blank')
        node.innerText = value.text

        return node
      }

      // let value be hash containing both href and text
      static value(node) {
        return { url: node.getAttribute('href'), text: node.innerText }
      }

      static formats(node) {
        return node.getAttribute('href')
      }
    }
    AttachmentBlot.blotName = 'attachment'
    AttachmentBlot.tagName = 'A'
    AttachmentBlot.className = 'attachment'

    Quill.register(AttachmentBlot)
  </script>
 `;
