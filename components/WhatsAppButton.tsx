import { whatsappLink } from '@/lib/site';
import styles from './WhatsAppButton.module.css';

/**
 * Floating click-to-chat button. Opens WhatsApp on the company number with a
 * prefilled first message, which is also what starts the bot conversation.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      className={styles.button}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Reputera on WhatsApp"
    >
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
          <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2.1 22l5.34-1.4a9.83 9.83 0 0 0 4.6 1.17h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.64-1.02-5.12-2.88-6.98A9.79 9.79 0 0 0 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2a8.14 8.14 0 0 1 5.79 2.4 8.13 8.13 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2Z" />
        </svg>
      </span>
      <span className={styles.label}>Chat on WhatsApp</span>
    </a>
  );
}
