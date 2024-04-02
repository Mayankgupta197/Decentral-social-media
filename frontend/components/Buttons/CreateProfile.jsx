import { useContract, useSigner } from "wagmi";
import HuddleContract from "@/abi/HuddleHubContract.json";
import useWeb3Storage from "@/hooks/useWeb3Storage";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { File } from 'nft.storage'
import { useNetwork } from "wagmi";
import { useContext } from "react";
import { ProfileContext } from "@/context/profile";

const CreateProfile = ({ handle, userName, profilePic, bio }) => {
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const router = useRouter();
  const {setLoader } = useContext(ProfileContext);
  const { storeNft } = useWeb3Storage();

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
      console.log("herre")
      setLoader(true)
      const metadataURI = await storeNft(profilePic,{
        display_name: userName,
          bio: bio,
          banner: ""
      });
      const id = await contract.createUser(handle, metadataURI);
      
      toast.success("User Created", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoader(false)
      router.push(`/home`);
    // }
  };

  return (
    <button
      className="rounded-lg px-5 mx-2 py-2 hover:scale-95 ease-in-out duration-300 min-w-fit w-[30%]  bg-gradient-to-r from-[#B537E5] via-[#F44A9B]  to-[#FF876E] my-10"
      onClick={handleOnClick}
    >
      Create Profile
    </button>
  );
};

export default CreateProfile;
