# Generated by Django 3.1.1 on 2020-10-15 05:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_auto_20201015_1110'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='blog_pic',
            field=models.ImageField(blank='True', default='blogs.jpg', null='True', upload_to='blog_pics/'),
        ),
    ]
