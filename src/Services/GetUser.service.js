"use client";
import { database } from "../firebase";
import { TimestampDate } from "timestamp-date";
import { doc, onSnapshot } from "firebase/firestore";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { User } from '../Interface/MainInterface';
const timestampDate = new TimestampDate();

export const getPost = async (id, cd) => {
  const querySnapshot = await getDocs(collection(database, "products"));
  querySnapshot.forEach((doc) => {
    const data = doc.data()
  
    cd(data)
  });

};


export const getApplication = (id, cd) => {
  const unsubscribe = onSnapshot(collection(database, "applications"), (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const docId = doc.id; // Get the document ID


      // You can pass both the document ID and data to the callback
      cd({ id: docId, ...data });
    });
  });

  // Return the unsubscribe function to stop listening when needed
  return unsubscribe;
};

export const getApplicationInformation = async()=>{
   getApplication(null, (postData) => {
    return postData
  });
}




// export const getAllProducts = async (id, cd) => {
//   const querySnapshot = await getDocs(collection(database, "files"));
//   querySnapshot.forEach((doc) => {
//     const data = doc.data()
//     console.log(data)
//     cd(data)
//   });

// };


// Delete product from Firestore


export const getAllProducts = async (id, cb) => {
  const orderedQuery = query(
    collection(database, "files"),

  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });
  cb(items);
};


export const getCurrentUser = async (id, cb) => {
  const orderedQuery = query(
    collection(database, "files"),

  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });
  cb(items);
};

export const Token = () => {
  const token = global.window.localStorage.getItem("token");
  return token;
};

export const getuser = async (id, cb) => {
  const token = Token()
  const orderedQuery = query(
    collection(database, "user"),where("id","==", token)
  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });

  cb(items);
};

export const userData = async()=>{
  getuser("", (res) => {
    const data = res[0];
    return data 
  });
  
}


export const getusers = async (id, cb) => {
  const orderedQuery = query(
    collection(database, "user"),
    orderBy("created", "desc")
  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });

  cb(items);
};

export const getTransaction = async (id, cb) => {
  const orderedQuery = query(
    collection(database, "transactions"),
    orderBy("created", "desc")
  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });

  cb(items);
};

export const gettransger = async (id, cb) => {
  const orderedQuery = query(
    collection(database, "transfers"),
    orderBy("createdAt", "desc")
  )
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });

  cb(items);
};



export const LoanRequest = async (id, cb) => {
  const orderedQuery = query(
    collection(database, "loanRequests"),
    orderBy("createdAt", "desc")
  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });

  cb(items);
};


export const FundRequest = async (id, cb) => {
  const orderedQuery = query(
    collection(database, "WithdrawalRequest"),
    orderBy("createdAt", "desc")
  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });
  cb(items);
};


export const getContact = async (id, cb) => {
  const orderedQuery = query(
    collection(database, "contactUs"),
    orderBy("created", "desc")
  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });

  cb(items);
};

export const getPosts = async (id, cb) => {
  const orderedQuery = query(
    collection(database, "products"),
    //orderBy("createdAt", "desc")
  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });
  
  cb(items);
};



export const getMessages = async (id, cb) => {
  const orderedQuery = query(
    collection(database, "contact"),
    orderBy("createdAt", "desc")
  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });
 
  cb(items);
};


// export   const getCartItems = async () => {
//   const user = auth.currentUser;

//   if (user) {
//     // Fetch from Firestore if user is logged in
//     const cartDocRef = doc(db, 'carts', user.uid);
//     const cartDoc = await getDoc(cartDocRef);

//     if (cartDoc.exists()) {
//       return cartDoc.data()?.items || [];
//     } else {
//       console.log('No cart found for user');
//       return [];
//     }
//   } else {
//     // Fetch from local storage if not logged in
//     return JSON.parse(localStorage.getItem('cartItems') || '[]');
//   }
// };

export const getProductByID = async (category, cb) => {
  const orderedQuery = query(
    collection(database, "products"),
    where("id", "==", category)
  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });
 
  cb(items);
};


export const getPostsbyCateories = async (category, cb) => {
  const orderedQuery = query(
    collection(database, "products"),
    where("category", "==", category)
  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });
 
  cb(items);
};

export const getVideoPost = async (car,cb) => {
  const orderedQuery = query(
    collection(database, "products"),
    where("fileType", "==", 'video')
  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });
 
  cb(items);
};


export const getProductbyCateories = async (category, cb) => {
  const orderedQuery = query(
    collection(database, "products"),
    where("category", "==", category)
  );
  const ref = await getDocs(orderedQuery);
  let reference = ref;
  const items = [];
  reference.forEach((doc) => {
    const item = doc.data();
    item.id = doc.id;
    items.push(timestampDate.parseTimestampToDate(item));
  });
  cb(items);
};

