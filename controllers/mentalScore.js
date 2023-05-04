
module.exports.getScore = async (req, res) => {
  const { name, value1, value2, value3 } = req.body;
  var weight_avg =
    (value1 + 4 * value2 + 3 * value3 + 2)/(3 + 2 + 1);
    
    let data = {weight: weight_avg};

    return res.status(200).send(data);

}
 
