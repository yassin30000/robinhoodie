"""create watchlists table

Revision ID: 791f21b14d40
Revises: f5f2d2e311c2
Create Date: 2023-09-17 12:33:03.121069

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '791f21b14d40'
down_revision = 'f5f2d2e311c2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('watchlist_stocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('watchlist_id', sa.Integer(), nullable=False),
    sa.Column('stock_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['stock_id'], ['stocks.id'], ),
    sa.ForeignKeyConstraint(['watchlist_id'], ['watchlists.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('watchlist_stocks')
    # ### end Alembic commands ###