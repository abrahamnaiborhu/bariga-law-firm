import { sitePath } from '../site.js';

export default function SiteLink({ href, ...props }) {
  return <a href={sitePath(href)} {...props} />;
}
