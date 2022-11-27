import Typography from '@mui/joy/Typography';
import Link from 'next/link';

export default function Home() {
  return (
    <section>
      <Typography>Hello</Typography>
      <Link href={`/users`}>
        <a className="block hover:underline">User</a>
      </Link>
      <Link href={`/events`}>
        <a className="block hover:underline">Event</a>
      </Link>
    </section>
  );
}
