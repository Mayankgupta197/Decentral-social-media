import { useContract, useSigner } from "wagmi";
import HuddleContract from "@/abi/HuddleHubContract.json";
import useWeb3Storage from "@/hooks/useWeb3Storage";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { ProfileContext } from "@/context/profile";
import { useRouter } from "next/router";
import { useNetwork } from "wagmi";

const CreatePost = ({ image, body, profileMetadata, username }) => {
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const router = useRouter();
  const { storePost} = useWeb3Storage();
  const { setLoader, primaryProfile } = useContext(ProfileContext);

  const contract = useContract({
    address: HuddleContract.address,
    abi: HuddleContract.abi,
    signerOrProvider: signer,
  });

  const handleOnClick = async () => {
    // if (chain.id !== 80001) {
    //   toast.error("Connect to Hyperspace Testnet", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    // } else {
      try {
        setLoader(true);
        // image ? (image = await storeFile(image)) : "";
        // const profile = await axios.get("https://cloudflare-ipfs.com/ipfs/bafyreihpao2af2ttvthe2mvjlglbytm227frxd5hupbsrymguijfiv5ane/metadata.json");
        const profile = await axios.get(primaryProfile?.metadata);
        console.log(profile)

        const metadataURI = await storePost(image,{
          body: body,
          display_name: profile?.data?.properties.display_name,
          profile_pic: profile?.data?.properties.profile_pic,
          username: primaryProfile?.username,
        });






console.log(metadataURI)
        const id = await contract.createPost(metadataURI);
        setLoader(false);
        toast.success("Post Created", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          router.reload();
        },4000);
      } catch (err) {
        setLoader(false);
        console.log(err);
      }
    // }
  };

  return (
    <button
      className="rounded-lg p-1  hover:scale-95 ease-in-out duration-300 text-base w-[15%] bg-gradient-to-r from-[#B537E5] via-[#F44A9B]  to-[#FF876E]"
      onClick={handleOnClick}
    >
      Post
    </button>
  );
};

export default CreatePost;
