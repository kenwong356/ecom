const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag}],
    });
    res.status(200).json(tags);
  } catch (error) {
 
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag}],
    });

    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    res.status(200).json(tag);
  } catch (error) {

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    if (!req.body.tag_name) {
      res.status(400).json({ error: 'Tag name is required' });
      return;
    }
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const [updatedRows] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows === 0) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    const updatedTag = await Tag.findByPk(req.params.id);
    res.status(200).json({ message: 'Tag updated successfully', updatedTag });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (deletedTag === 0) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (error) {

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
