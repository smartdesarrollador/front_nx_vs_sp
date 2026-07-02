import { redirect } from 'next/navigation';

export default function HomePage() {
  const hubUrl = process.env.NEXT_PUBLIC_HUB_URL ?? 'http://localhost:3003';
  redirect(hubUrl);
}
