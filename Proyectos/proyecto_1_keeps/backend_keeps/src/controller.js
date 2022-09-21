module.exports = {
    contarNotas(req, res) {
        let note;
        note = req.body;
        let countNote = note.length;
        return res.status(200).json(countNote);
    },
};
