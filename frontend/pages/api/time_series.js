const corona_lib = require('../../lib/data_getter')

export default (req, res) =>{
    res.status(200).json(corona_lib.get_corona_data());
}