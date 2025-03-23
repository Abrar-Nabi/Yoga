const Style = require("../models/Style");

exports.getStyles = async (req, res) => {
  try {
    const styles = await Style.find();
    res.json(styles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching styles" });
  }
};

exports.addStyle = async (req, res) => {
  try {
    const { name } = req.body;
    const picture = req.file ? req.file.filename : null; 

    const style = new Style({ name, picture });
    await style.save();
    
    res.status(201).json(style);
  } catch (error) {
    res.status(500).json({ message: "Error adding style" });
  }
};

exports.updateStyle = async (req, res) => {
  try {
    const { name } = req.body;
    const picture = req.file ? req.file.filename : req.body.picture; 

    const style = await Style.findByIdAndUpdate(req.params.id, { name, picture }, { new: true });

    if (!style) return res.status(404).json({ message: "Style not found" });

    res.json(style);
  } catch (error) {
    res.status(500).json({ message: "Error updating style" });
  }
};

exports.deleteStyle = async (req, res) => {
  try {
    await Style.findByIdAndDelete(req.params.id);
    res.json({ message: "Style deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting style" });
  }
};
