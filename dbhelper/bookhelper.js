/**
 * 封装 数据库操作方法
 */
const logger = require('../config/log');
class bookHelper {
    /**
     * 获取集合内所有内容
     */
    static async getBookList(Model) {
        const list = await Model.find({}).catch((err) => {
            logger.error('查询书籍目录失败');
        });
        return list;
    }
    /**
     * 获取指定集合内 某种类型数据长度
     * @param {*} Model
     * @param {Json} query 查询条件
     * @return{Number} 返回数字 长度
     */
    static async getCollectionLength(Model, query) {
        const count = await Model.count({
            query
        }).catch((err) => {
            logger.error('查询集合长度失败');
        });
        return count;
    }
    /**
     * 根据提供字段 去重查询集合
     * @param {*} Model
     * @param {String} field
     * @return {Array} list 返回查询集合
     */
    static async getCollectionByDistinct(Model, field) {
        const list = await Model.distinct(field).catch((err) => {
            logger.error('根据提供字段去重查询集合失败,field:' + field);
        });
        return list;
    }
    /**
     * 批量插入数据到集合中
     * @param {*} Model
     * @param {Array} insertList
     * @return {Boolean} flag
     */
    static async insertCollection(Model, insertList) {
        let flag = true;
        let res = await Model.collection.insert(insertList);
        if (!res) {
            flag = false;
        }
        return flag;
    }
}
module.exports = bookHelper;