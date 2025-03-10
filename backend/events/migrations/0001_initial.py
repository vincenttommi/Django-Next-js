# Generated by Django 5.1.6 on 2025-03-10 13:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EventType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('detail', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Bellissimo_event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_detail', models.TextField()),
                ('total_quest', models.IntegerField()),
                ('event_date', models.DateField()),
                ('booking_amount', models.DateField()),
                ('booking_date', models.JSONField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('event_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.eventtype')),
            ],
        ),
    ]
