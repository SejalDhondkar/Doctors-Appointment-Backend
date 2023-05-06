const UserModel = require('../models/user')
const rp = require('request-promise');
const HistoryModel = require('../models/bookingHistory')

module.exports = {

    generateMeeting: async (req, res) => {
        const options = {
            method: 'POST',
            uri: 'https://api.join.skype.com/v1/meetnow/guest',
            body: {
                title :"Health Bridge",
                source :"meet_control",
                displayName:"Guest user"
            },
            json: true // automatically parse response body as JSON
          };
        
          rp(options)
            .then(response => {
              // handle success response here
              res.status(200).send(response);
            })
            .catch(error => {
              // handle error response here
              res.status(500).send(error);
            });
        
    },

    saveMeetingLink: async (req, res) => {
      const bookId = req.body.historyId;
      const link = req.body.link;
        
        const booking = await HistoryModel.findByIdAndUpdate(bookId, {link: link}, {"new": true});
        // console.log(booking);
        if(!booking){
            return res.status(400).json({message: "Invalid request"});
        }
        // const slotInfo = await SlotsModel.findByIdAndUpdate(req.body.slotId, {status: slotStatus.OPEN},{ "new": true});

        return res.status(200).json(booking);
    }

}