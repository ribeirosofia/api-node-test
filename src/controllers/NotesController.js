const knex = require("../database/knex");

class NotesController {
    async create(request, response) {
        const { title, description, tags, links } = request.body;
        const { user_id } = request.params;

        try {
            const [note_id] = await knex("notes").insert({
                title,
                description,
                user_id
            }).returning('id');

            const linksInsert = links.map(link => ({
                note_id,
                url: link,
                created_at: new Date(),
                updated_at: new Date()
            }));

            await knex("links").insert(linksInsert);

            const tagsInsert = tags.map(name => ({
                note_id,
                name,
                user_id
            }));

            await knex("tags").insert(tagsInsert);

            response.json();
        } catch (error) {
            console.error('Error creating note:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    }

    async show(request, response) {
        const { id } = request.params;

        try {
            const note = await knex("notes").where({ id }).first();
            console.log('Note:', note);

            if (!note) {
                return response.status(404).json({ error: 'Note not found' });
            }

            const tags = await knex("tags").where({ note_id: id }).orderBy("name");
            console.log('Tags:', tags);

            const links = await knex("links").where({ note_id: id }).orderBy("created_at");
            console.log('Links:', links);

            return response.json({
                ...note,
                tags,
                links
            });
        } catch (error) {
            console.error('Error fetching note:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            await knex("notes").where({ id }).delete();
            response.json({ message: 'Note deleted successfully' });
        } catch (error) {
            console.error('Error deleting note:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    }

    async index(request, response) {
        const { title, user_id, tags } = request.query;

        try{
            let notes;

            if(tags){
                const filterTags = tags.split(',').map(tag => tag.trim());
                notes = await knex("tags")
                .whereIn("name", filterTags);

            } else{

            }
            
            notes = await knex("notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title");
            response.json({ notes });
        } catch(error){
            console.error('Error fetching notes:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
        
    }
}

module.exports = NotesController;
