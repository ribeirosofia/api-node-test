const knex = require("../database/knex");

class TagsController{
    async index(request, response){
        const { user_id } = request.params;
        try{
            const tags = await knex("tags")
            .where({user_id});
            return response.json(tags);
        } catch(error){
            console.error('Error fetching notes:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
        
    }
}

module.exports = TagsController;