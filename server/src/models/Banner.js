const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Banner = new Schema(
    {
        image: { type: String },
        redirecUrl: { type: String },
    },
    { timestamps: true }
);

Banner.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('Banner,banner');
