import tw from "tailwind-styled-components";
import { FaDiscord, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <Container>
      <FooterContainer>
        © 2022 Degen Vibes LLC 
      </FooterContainer>
      <SocialLinkFooter href={"https://twitter.com/livethelifetv"} target={"_blank"} rel="noreferrer"> <FaTwitter /> </SocialLinkFooter>
      <SocialLinkFooter href={"https://discord.gg/gvo"} target={"_blank"} rel="noreferrer"> <FaDiscord /> </SocialLinkFooter>
    </Container>
  )
}

export default Footer

const SocialLinkFooter = tw.a`
 my-5
 p-1
`

const FooterContainer = tw.div`
 max-w-screen-lg
 w-full
`

const Container = tw.div`
 flex
 justify-center
 my-5
 text-center
`
