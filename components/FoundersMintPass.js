import {
    ChainId,
    ThirdwebNftMedia,
    useAddress,
    useClaimNFT,
    useEditionDrop,
    useMetamask,
    useNetwork,
    useNetworkMismatch,
    useNFTs,
  } from "@thirdweb-dev/react";
  import React from "react";
  import contracts from "../constants/contracts";
  import css from "../css/Nft.module.css";
  import { useEffect, useState } from "react";
  import ReactLoading from "react-loading";
  import { toast } from "react-toastify";
  import { useRouter } from 'next/router'
  import { Button } from "./Button";

  const Minting = () => {
    const [totalSupply, setTotalSupply] = useState(0);
    const [inProgress, setInProgress] = useState(false);
    const [completed, setCompleted] = useState(false);
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const disconnectWallet = useDisconnect();
    const networkMismatch = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();
    const editionDropContract = useEditionDrop(contractAddresses[2].address);
    const router = useRouter()
  
    const mint = async () => {
      if(EditionDrop && address) {
        setInProgress(true);
        try {
          await EditionDrop.claimTo(address, 0, 1);
          setInProgress(false);
          setCompleted(true);
          router.push('/success')
          toast.success('🦄 Mint Successful! LFG')
        } catch (error) {
          console.log(error)
          setInProgress(false)
          setCompleted(false)
          toast.error('Looks like you do not have a LiveTheLifeTV NFT in your collection.')
        }
      }
    }
  
    useEffect(() => {
      const getTotal = async () => {
        if(EditionDrop) {
          const total = await EditionDrop.totalSupply(0);
          setTotalSupply(total.toNumber());
        }
      }
      getTotal();
    }, [EditionDrop])

  
    // Get all NFTs from the Edition Drop contract
    const { data: nfts, isLoading } = useNFTs(editionDropContract);
  
    // Claim an NFT (and update the nfts above)
    const { mutate: claimNft, isLoading: claiming } =
      useClaimNFT(editionDropContract);
  
    return (
      <div className={styles.container}>
        <div className={styles.collectionContainer}>
          <div className={styles.detailPageContainer}>
            <h1>Edition Drop</h1>
            <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />
  
            <p>
              This <b>Edition Drop</b> lazy mints your Founders Mint Pass.
            </p>
  
            <p>
            The Founders Mint Pass acts as an access card to our community of digital artists 
            and collectors as well as its exclusive events, including art and cultural trips, 
            private auctions, gallery openings, and artist dinners. 
            It unlocks priority mints from our roster of iconic and emerging artists! 
            NFT is the product. The MetaVerse is the digital customer experience. 
            </p>
  
            <p>
              <a
                className={styles.lightPurple}
                href="https://livethelife.tv"
              >
                Check out our editorial here.
              </a>
            </p>
          </div>
  
          {!isLoading ? (
            <div className={styles.nftBoxGrid}>
              {nfts?.map((nft) => (
                <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    className={styles.nftMedia}
                  />
                  <h3>{nft.metadata.name}</h3>
                  <button
                    className={`${styles.mainButton} ${styles.spacerBottom}`}
                    onClick={() =>
                      address
                        ? networkMismatch
                          ? switchNetwork && switchNetwork(ChainId.Rinkeby)
                          : claimNft({
                              quantity: 1,
                              tokenId: nft.metadata.id,
                              to: address,
                            })
                        : connectWallet()
                    }
                  >
                    Claim
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  }

  
  const Count = tw.div`
  flex
  grow
  items-center
  justify-center
 `
 
 const ButtonContainer = tw.div`
  mt-2
  gap-4
  flex
  p-2
  ml-2
 `
 
 const Mint = tw.div`
  max-w-screen-sm
  lg:w-1/3
  md:w-1/2
  bg-black
  lg:mt-[-200px]
  z-50
  flex
  flex-col
  pb-4
  pr-4
 `
 
 const Title = tw.h2`
  uppercase
  text-3xl
  font-bold
  mt-4
  p-2
  ml-2
 `
 
 const TitleContainer = tw.div`
  flex
 `
 
 const Container = tw.div`
  max-w-screen-lg
  w-full
  z-50
 `