# Generated by Django 4.1.6 on 2023-04-10 03:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_media_assignment_media_solution_alter_media_facility'),
    ]

    operations = [
        migrations.AlterField(
            model_name='manager',
            name='role',
            field=models.CharField(choices=[('a', 'admin'), ('b', 'user')], max_length=1),
        ),
    ]
