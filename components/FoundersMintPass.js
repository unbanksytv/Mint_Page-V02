import {
    ChainId,
    ThirdwebNftMedia,
    useAddress,
    useClaimNFT,
    useEditionDrop,
    useNFTs,
  } from "@thirdweb-dev/react";
  import React from "react";
  import contracts from "../common/contracts";
  import { useEffect, useState } from "react";
  import { toast } from "react-toastify";
  import { useRouter } from 'next/router'

  const MintPass = () => {
    const [totalSupply, setTotalSupply] = useState(0);
    const [inProgress, setInProgress] = useState(false);
    const [completed, setCompleted] = useState(false);
    const address = useAddress();
    const disconnectWallet = useDisconnect();
    const editionDropContract = useEditionDrop(contracts[2].address);
    const router = useRouter()
  
    const FoundersMintPass = async () => {
      if(MintPass && address) {
        setInProgress(true);
        try {
          await MintPass.claimTo(address, 0, 1);
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
        if(MintPass) {
          const total = await MintPass.totalSupply(0);
          setTotalSupply(total.toNumber());
        }
      }
      getTotal();
    }, [MintPass])

  
    // Get all NFTs from the Edition Drop contract
    const { data: nfts, isLoading } = useNFTs(MintPassContract);
  
    // Claim an NFT (and update the nfts above)
    const { mutate: claimNft, isLoading: claiming } =
      useClaimNFT(MintPassContract);
  
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

  export default FoundersMintPass