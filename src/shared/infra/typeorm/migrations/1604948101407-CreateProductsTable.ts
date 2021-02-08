import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateProductsTable1604948101407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'category_id',
                    type: 'uuid'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }

}
