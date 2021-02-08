import { MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class CategoryIdColumnOnProductTable1604949647046 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('products', new TableForeignKey({
            name: 'ProductCategory',
            columnNames: ['category_id'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products', 'ProductCategory')
    }

}
