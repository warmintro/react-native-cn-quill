export const quill_video_js = () => `
  <script>

    function sanitizeUrl(url, protocols) {
      var anchor = document.createElement('a');
      anchor.href = url;
      var protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
      return protocols.indexOf(protocol) > -1;
    }

    function getVideoUrl(url) {
      var match = url.match(/^(?:(https?):\\/\\/)?(?:(?:www|m)\\.)?youtube\\.com\\/watch.*v=([a-zA-Z0-9_-]+)/) ||
          url.match(/^(?:(https?):\\/\\/)?(?:(?:www|m)\\.)?youtu\\.be\\/([a-zA-Z0-9_-]+)/) ||
          url.match(/^.*(youtu.be\\/|v\\/|e\\/|u\\/\\w+\\/|embed\\/|v=)([^#\\&\\?]*).*/);
      console.log(match[2]);
      if (match && match[2].length === 11) {
          return ('https') + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
      }
      if (match = url.match(/^(?:(https?):\\/\\/)?(?:www\\.)?vimeo\\.com\\/(\\d+)/)) { // eslint-disable-line no-cond-assign
          return (match[1] || 'https') + '://player.vimeo.com/video/' + match[2] + '/';
      }
      return null;
    }

    var SANITIZED_URL = 'about:blank';
    var PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];

    var BlockEmbed = Quill.import('blots/block/embed');

    class VideoBlot extends BlockEmbed {
      static create(url) {
        let node = super.create();
        node.setAttribute('src', getVideoUrl(this.sanitize(url)));
        node.setAttribute('frameborder', '0');
        node.setAttribute('allowfullscreen', true);
        node.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        return node;
      }

      static formats(node) {
        let format = {};
        if (node.hasAttribute('height')) {
          format.height = node.getAttribute('height');
        }
        if (node.hasAttribute('width')) {
          format.width = node.getAttribute('width');
        }
        return format;
      }

      static value(node) {
        return node.getAttribute('src');
      }

      static sanitize(url) {
        return sanitizeUrl(url, PROTOCOL_WHITELIST) ? url : SANITIZED_URL;
      }

      format(name, value) {
        if (name === 'height' || name === 'width') {
          if (value) {
            this.domNode.setAttribute(name, value);
          } else {
            this.domNode.removeAttribute(name, value);
          }
        } else {
          super.format(name, value);
        }
      }
    }

    VideoBlot.blotName = 'video';
    VideoBlot.tagName = 'iframe';

    Quill.register(VideoBlot);
  </script>
 `;
