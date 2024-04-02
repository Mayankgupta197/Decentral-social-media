import React from "react";
import { Web3Storage } from "web3.storage";
import { NFTStorage, File } from 'nft.storage'

const useWeb3Storage = () => {
  const makeStorageClient = () => {
    return new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY,
    });
  };

  const storeFile = async (file, token) => {
    try {
      const client = makeStorageClient();
      const cid = await client.put([file]);
      return "https://" + cid + ".ipfs.w3s.link/" + file.name;
    } catch (err) {
      console.error(err);
    }
  };

  const retrieveFile = async (cid) => {
    const client = makeStorageClient();
    const res = await client.get(cid);
    if (!res.ok) {
      throw new Error(
        `Failed to get ${cid} - [${res.status}] ${res.statusText}`
      );
    }
    const file = await res.files();
    return file[0];
  };

  const storeNft = async (pic,data) => {
    const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYwOTAzMjE0ZDRCNmQ1MTlhOGE0YTg4N2UzYUY4ODEzQWZGNkYxYTMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcxMjAwNTk4NTQ4MSwibmFtZSI6ImRzZCJ9.F5iM_0gucICyVlzmpBzZed2Pehim4xR9-I3oDVD1eXc' })
  
    const metadata = await client.store({
      name: 'Profile Post',
      description: 'Pin',
    properties:{
      profile_pic: new File(
        [
          pic
        ],
        'image.png',
        { type: 'image/png' }
      ),
 ...data
    },
      image: new File(
        [
          
        ],
        'pinpie.png',
        { type: 'image/jpg' }
      ),
    })
    return 'https://cloudflare-ipfs.com/ipfs/' + metadata.url.substring(7)
    // ipfs://bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjj4z2iu533cprgbz23m/metadata.json
  }
  const storePost = async (postPic,data) => {
    const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYwOTAzMjE0ZDRCNmQ1MTlhOGE0YTg4N2UzYUY4ODEzQWZGNkYxYTMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcxMjAwNTk4NTQ4MSwibmFtZSI6ImRzZCJ9.F5iM_0gucICyVlzmpBzZed2Pehim4xR9-I3oDVD1eXc' })
  
    if (postPic){
      
      const metadata = await client.store({
        name: 'Profile Post',
        description: 'Pin',
      properties:{
        image: new File(
          [
            postPic
          ],
          'imagepost.png',
          { type: 'image/png' }
        ),

   ...data
      },
        image: new File(
          [
            
          ],
          'pinpie.png',
          { type: 'image/jpg' }
        ),
      })
      console.log(metadata)
      return 'https://cloudflare-ipfs.com/ipfs/' + metadata.url.substring(7)
    }
    else{

      const metadata = await client.store({
        name: 'Profile Post',
        description: 'Pin',
      properties:{
   ...data
      },
        image: new File(
          [
            
          ],
          'pinpie.png',
          { type: 'image/jpg' }
        ),
      })
      console.log(metadata)
      return 'https://cloudflare-ipfs.com/ipfs/' + metadata.url.substring(7)
    }
   
  }

  return { makeStorageClient, storeFile, retrieveFile,storeNft,storePost };
};

export default useWeb3Storage;
