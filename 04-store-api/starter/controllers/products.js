const Products = require('../models/product')

const getAllProducts = async (req, res) => {
    const products = await Products.find({})
    res.status(200).json({ "nbHits": products.length, products })
}

const getFilteredProducts = async (req, res) => {
    const { featured, name, company, sort, fields, limit, page, filter } = req.query;
    const queryObject = {};

    if (featured) queryObject.featured = featured === 'true' ? true : false;
    if (name) queryObject.name = { $regex: name, $options: 'i' };
    if (company) queryObject.company = company;
    if (filter) {
        const operators = {
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq',
            '>': '$gt',
            '>=': '$gte'
        }
        let regex = /\b(<|<=|=|>=|>)\b/g
        let filters = filter.replace(regex, (match) => `-${operators[match]}-`)
        let options = ['price', 'rating']
        filters.split(',').forEach(val => {
            let [fieldName, operatorFunc, operatorValue] = val.split('-')
            if (options.includes(fieldName)) {
                queryObject[fieldName] = { [operatorFunc]: Number(operatorValue) }
            }
        })
    }

    var products = Products.find(queryObject)


    if (sort) {
        let order = sort.split(',').join(' ')
        products = products.sort(order)
    } else {
        products = products.sort('createdAt')
    }

    if (fields) {
        let select = fields.split(',').join(' ')
        products = products.select(select)
    }

    if (page) {
        let skipVal = 5 * (Number(page) - 1)
        products = products.skip(skipVal).limit(5)
    } else if (limit) {
        products = products.limit(Number(limit))
    }

    const result = await products
    res.status(200).json({ "nbHits": result.length, result })
}




module.exports = { getAllProducts, getFilteredProducts }