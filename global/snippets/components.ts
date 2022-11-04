/**
 * This snippet is used to dynamically import Attributes `<script>` for Library Components.
 * It is not meant to be used in the codebase.
 * Instead, we add this inside an HTML Embed for each Library Component.
 */
const COMPONENT_SRC = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-modal@1/modal.js';
let script = document.querySelector<HTMLScriptElement>(`script[src="${COMPONENT_SRC}"]`);
if (!script) {
  script = document.createElement('script');
  script.async = true;
  script.src = COMPONENT_SRC;
  document.head.append(script);
}
