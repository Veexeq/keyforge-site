-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "originalPrice" DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "discountPrice" DECIMAL(10,2);
