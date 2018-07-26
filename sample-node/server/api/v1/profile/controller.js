let profileCollection = require('../login/model');

let profileDetails = (req, res) => {
    // console.log(req)
    profileCollection.findById({ _id: req.params.id })
        .then(
            (response) => {
                res.status(200).json({ status: true, message: "Successfully Fetched Details", userData: response });
            }
        ).catch(
            (error) => {
                res.status(500).json({ status: false, message: "Error While fetching Details" });
            }
        )
}

let userDetails = (req, res) => {
    // console.log(req)
    profileCollection.find()
        .then(
            (response) => {
                res.status(200).json({ status: true, message: "Successfully Fetched Details", userData: response });

            }
        ).catch(
            (error) => {
                res.status(500).json({ status: false, message: "Error While fetching Details" });
            }
        )
}

let addRequest = (req, res) => {
    // console.log(req)
    profileCollection.findOneAndUpdate({ _id: req.body.senderId }, { $push: { "friendsReqList": { friendId: req.body.recieverId, status: req.body.status } } })
        .then(
            (response) => {
                res.status(200).json({ status: true, message: "Successfully Sent Friend request", userData: response });
            }
        ).catch(
            (error) => {
                res.status(500).json({ status: false, message: "Internal server error" });
            }
        )
}


let confirmRequest = (req, res) => {
    profileCollection.findOneAndUpdate({ _id: req.body.senderId }, { $push: { "friendsList":  req.body.recieverId  } })
        .then(
            (response) => {
                profileCollection.findOneAndUpdate({ _id: req.body.recieverId }, { $push: { "friendsList":  req.body.senderId  } })
                    .then(
                        (response) => {
                            res.status(200).json({ status: true, message: "Successfully Added Friend" });
                        }
                    ).catch(
                        (error) => {
                            res.status(500).json({ status: false, message: "Internal server error" });
                        }
                    )
            }
        ).catch(
            (error) => {
                res.status(500).json({ status: false, message: "Internal server error" });
            }
        )
}


let getFiendsList = (req, res) => {
    profileCollection.findOne({ _id: req.body.id })
        .then(
            (response) => {
                profileCollection.find({ _id : { $in : response.friendsList } },{password:0})
                    .then(
                        (friendsDetails)=>{
                            res.status(200).json({ status: true, message: "Successfully Fetched Friends Details" , friends : friendsDetails });
                        }
                    ).catch(
            (error) => {
                res.status(500).json({ status: false, message: "Internal server error" });
            }
        )
            }
        ).catch(
            (error) => {
                res.status(500).json({ status: false, message: "Internal server error" });
            }
        )
}


module.exports = {
    profileDetails,
    userDetails,
    addRequest,
    confirmRequest,
    getFiendsList

}