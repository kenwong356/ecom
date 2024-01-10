const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });
 
  if (!category) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }

  res.status(200).json(category);
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}

});

router.post('/', async (req, res) => {
  // create a new category
  try {
  const newCategory = await Category.create(req.body);
  res.status(201).json(newCategory);
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
  const categoryId = req.params.id;
  const [updatedCategory] = await Category.update(req.body, {
    where: { id: categoryId },
  });

  if (updatedCategory === 0) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }

  res.status(200).json({ message: 'Category updated successfully' });
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
  const categoryId = req.params.id;
  const deletedRowCount = await Category.destroy({
    where: { id: categoryId },
  });

  if (deletedRowCount === 0) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }

  res.status(200).json({ message: 'Category deleted successfully' });
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

module.exports = router;
