import { sitePath } from '../site.js';
export function EditorialImage({ image, variant = '' }) {
  return <figure className={`editorial-image ${variant}`} data-motion="image">
    <img src={sitePath(`/images/${image}.jpg`)} width="1440" height="960" alt="" loading="lazy" fetchPriority="low" />
  </figure>;
}
