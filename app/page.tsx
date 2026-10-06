import EngineeringSite from './components/EngineeringSite';

export default function Home() {
  const emailEnabled = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL);
  return <EngineeringSite emailEnabled={emailEnabled} />;
}
