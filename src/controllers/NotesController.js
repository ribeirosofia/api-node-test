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

            if (!note) {
                return response.status(404).json({ error: 'Note not found' });
            }

            
            const tags = await knex("tags").where({ note_id: id }).orderBy("name");
            const links = await knex("links").where({ note_id: id }).orderBy("created_at");

            return response.json({
                ...note,
                tags: tags.map(tag => ({ name: tag.name })),
                links: links.map(link => ({ url: link.url }))
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
                .select([
                    "notes.id",
                    "notes.title",
                    "notes.user_id"
                ])
                .innerJoin("notes", "notes.id", "tags.note_id")
                .where("notes.user_id", user_id)
                .whereLike("notes.title", `%${title}%`)
                .whereIn("name", filterTags)
                .groupBy("notes.id")
                .orderBy("notes.title")

            } else{
                notes = await knex("notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title");
            }

            const noteIds = notes.map(note => note.id);
            const tags = await knex("tags")
            .whereIn("note_id", noteIds);

            const links = await knex("links")
            .whereIn("note_id", noteIds);

            const notesWithTagsAndLinks = notes.map(note => {
                const noteTags = tags.filter(tag => tag.note_id === note.id);
                const noteLinks = links.filter(link => link.note_id === note.id);
                return {
                    ...note,
                    tags: noteTags.map(tag => ({ name: tag.name })),
                    links: noteLinks.map(link => ({ url: link.url }))
                };
            });

            response.json(notesWithTagsAndLinks);
            
        } catch(error){
            console.error('Error fetching notes:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
        
    }
}

module.exports = NotesController;
