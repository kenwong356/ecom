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
    res.status(500).json(err);
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
  res.status(500).json(err);
}

});

router.post('/', async (req, res) => {
  try {
    if (!req.body.category_name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
  const categoryId = req.params.id;
  const updatedCategory = await Category.update(req.body, {
    where: { id: categoryId },
  });

  if (updatedCategory === 0) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }

  res.status(200).json({ message: 'Category updated successfully' });
} catch (err) {
  res.status(500).json({ error: 'Internal Server Error' });
}
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
  const categoryId = req.params.id;
  const deleteCategory = await Category.destroy({
    where: { id: categoryId },
  });

  if (deleteCategory === 0) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }

  res.status(200).json({ message: 'Category deleted successfully' });
} catch (err) {
  res.status(500).json({ error: 'Internal Server Error' });
}
});

module.exports = router;
