# Generated by Django 5.1.6 on 2025-03-10 11:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0002_room_booking'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='booking_detail',
            field=models.JSONField(null=True),
        ),
    ]
