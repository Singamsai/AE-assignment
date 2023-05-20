const initialdata = {
    postsdata:[]
}

const basicReducer = (storedata=initialdata, Action)=>{
    if(Action.type === "posts"){
        return {
            ...storedata,
            postsdata: Action.postsdata
        }
    }
    return storedata
}

export default basicReducer