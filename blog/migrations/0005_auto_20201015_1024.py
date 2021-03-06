# Generated by Django 3.1.1 on 2020-10-15 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_auto_20201012_0936'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='blog_pic',
            field=models.ImageField(blank='True', default='default.jpg', null='True', upload_to='blog_pics/'),
            preserve_default='True',
        ),
        migrations.AlterField(
            model_name='blog',
            name='created_on',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]
