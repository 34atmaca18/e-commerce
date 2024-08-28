export const formatCategory = (category: string): string => {
    // Kategori eşlemeleri
    const categoryMapping: { [key: string]: string } = {
      'electronicproducts': 'electronic',
      'foodproducts': 'food',
      // Buraya diğer kategori eşlemelerini ekleyebilirsiniz
    };
  
    // Eğer kategori eşlemelerinden biri varsa, dönüşüm yap
    return categoryMapping[category] || category;
  };