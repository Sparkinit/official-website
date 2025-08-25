import { Html, Button } from "@react-email/components";

interface EmailProps {
  url: string;
}

export function Email(props: EmailProps) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
}

export default Email;
