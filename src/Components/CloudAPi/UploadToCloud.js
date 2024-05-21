export const uploadtoCloud = async(pics) => {

    if(pics){
        const data = new FormData();
        data.append("file",pics)
        data.append("upload_preset","needThis");
        data.append("cloud_name" , "dytwgh80l")

        const res = await fetch("https://api.cloudinary.com/v1_1/dytwgh80l/image/upload",{
            method:"post",
            body : data
        });

        const fileData = await res.json();
        return fileData?.url?.toString();
    }

    else console.log("errrror from upload function")

}

// export const uploadtoCloud = async (pics) => {
//     if (pics) {
//       const data = new FormData();
//       if (Array.isArray(pics)) {
//         pics.forEach((pic) => data.append("file", pic));
//       } else {
//         data.append("file", pics);
//       }
//       data.append("upload_preset", "needThis");
//       data.append("cloud_name", "dytwgh80l");
//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/dytwgh80l/image/upload",
//         {
//           method: "post",
//           body: data,
//         }
//       );
//       const fileData = await res.json();
//       return fileData?.secure_url?.toString();
//     } else {
//       console.log("errrror from upload function");
//     }
//   };
  
