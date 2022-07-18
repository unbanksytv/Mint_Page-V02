import tw from "tailwind-styled-components";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <Container>
      <FooterContainer>
       © Degen Vibes LLC 
      </FooterContainer>
     <SocialLinkFooter href={"https://twitter.com/livethelifetv"} target={"_blank"} rel="noreferrer"> <FaTwitter /> </SocialLinkFooter>
     <SocialLinkFooter href={"https://discord.gg/gvo"} target={"_blank"} rel="noreferrer"> <FaDiscord /> </SocialLinkFooter>
     <SocialLinkFooter href={"https://github.com"} target={"_blank"} rel="noreferrer"> <FaGithub /> </SocialLinkFooter>
    </Container>
  )
}

export default Footer

const SocialLinkFooter = tw.a`
 w-5
 flex
`

const FooterContainer = tw.div`
 max-w-screen-lg
 w-full
`

const Container = tw.div`
 flex
 my-5
 text-center
 w-full
 mt-1
`
