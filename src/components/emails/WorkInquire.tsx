import {
  Html,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Section,
} from "@react-email/components";
type Props = {
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};
export default function WorkInquire({
  company,
  firstName,
  lastName,
  email,
  message,
}: Props) {
  return (
    <Html lang="en" dir="ltr">
      <Preview>Job Inquire: {company} </Preview>
      <Body>
        <Container align="left">
          <Section>
            <Text>Company: {company}</Text>
            <Text>
              Name: {firstName} {lastName}
            </Text>
            <Text>Email: {email}</Text>
          </Section>
          <Section>
            <Text>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
