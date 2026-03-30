import 'package:flutter/material.dart';

import '../config/branding.dart';
import '../widgets/responsive.dart';

class BookingScreen extends StatefulWidget {
  final BrandingConfig config;
  const BookingScreen({super.key, required this.config});

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  DateTime _selectedDay = DateTime.now();
  String? _selectedSlot;
  String _service = 'Consultation';

  static const _services = ['Consultation', 'Haircut', 'Massage', 'Spa', 'Coaching'];
  static const _slots = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30'];

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Scaffold(
      body: SafeArea(
        child: ContentWidth(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
            children: [
              const SizedBox(height: 8),
              Text('Book an appointment',
                  style: Theme.of(context).textTheme.headlineMedium),
              const SizedBox(height: 8),
              Text('Pick a service, choose a date and time slot.',
                  style: TextStyle(color: cs.onSurfaceVariant, fontSize: 14)),
              const SizedBox(height: 24),

              Text('Service', style: Theme.of(context).textTheme.titleMedium),
              const SizedBox(height: 8),
              Wrap(spacing: 8, runSpacing: 8, children: [
                for (final s in _services)
                  ChoiceChip(
                    label: Text(s),
                    selected: _service == s,
                    onSelected: (_) => setState(() => _service = s),
                  ),
              ]),
              const SizedBox(height: 24),

              Text('Date', style: Theme.of(context).textTheme.titleMedium),
              const SizedBox(height: 8),
              SizedBox(
                height: 92,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: 14,
                  separatorBuilder: (_, __) => const SizedBox(width: 10),
                  itemBuilder: (_, i) {
                    final d = DateTime.now().add(Duration(days: i));
                    final selected = d.day == _selectedDay.day && d.month == _selectedDay.month;
                    return _DayChip(
                      date: d, selected: selected,
                      onTap: () => setState(() => _selectedDay = d),
                    );
                  },
                ),
              ),
              const SizedBox(height: 24),

              Text('Time', style: Theme.of(context).textTheme.titleMedium),
              const SizedBox(height: 12),
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _slots.length,
                gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                  maxCrossAxisExtent: 120, mainAxisExtent: 48,
                  crossAxisSpacing: 10, mainAxisSpacing: 10,
                ),
                itemBuilder: (_, i) {
                  final slot = _slots[i];
                  final selected = slot == _selectedSlot;
                  return _SlotChip(label: slot, selected: selected, onTap: () => setState(() => _selectedSlot = slot));
                },
              ),
              const SizedBox(height: 28),

              FilledButton.icon(
                onPressed: _selectedSlot == null ? null : () => _confirm(context),
                icon: const Icon(Icons.check_circle_outline),
                label: const Text('Confirm booking'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _confirm(BuildContext ctx) {
    final cs = Theme.of(ctx).colorScheme;
    showModalBottomSheet(
      context: ctx,
      backgroundColor: Theme.of(ctx).colorScheme.surface,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(28))),
      builder: (_) => Padding(
        padding: const EdgeInsets.fromLTRB(24, 20, 24, 32),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Container(
            width: 64, height: 64,
            decoration: BoxDecoration(color: cs.primaryContainer, shape: BoxShape.circle),
            child: Icon(Icons.check_rounded, color: cs.onPrimaryContainer, size: 32),
          ),
          const SizedBox(height: 16),
          Text('Booking confirmed', style: Theme.of(ctx).textTheme.titleLarge),
          const SizedBox(height: 6),
          Text(
            '$_service on ${_selectedDay.day}.${_selectedDay.month.toString().padLeft(2, '0')} at $_selectedSlot',
            textAlign: TextAlign.center,
            style: TextStyle(color: cs.onSurfaceVariant),
          ),
          const SizedBox(height: 20),
          FilledButton(onPressed: () => Navigator.pop(ctx), child: const Text('Done')),
        ]),
      ),
    );
  }
}

class _DayChip extends StatelessWidget {
  final DateTime date;
  final bool selected;
  final VoidCallback onTap;
  const _DayChip({required this.date, required this.selected, required this.onTap});

  static const _wd = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return InkWell(
      borderRadius: BorderRadius.circular(20),
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 160),
        width: 64,
        decoration: BoxDecoration(
          color: selected ? cs.primary : cs.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(20),
        ),
        padding: const EdgeInsets.symmetric(vertical: 12),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text(_wd[date.weekday - 1],
              style: TextStyle(
                fontSize: 10.5, fontWeight: FontWeight.w700, letterSpacing: .8,
                color: selected ? cs.onPrimary.withOpacity(.85) : cs.onSurfaceVariant,
              )),
          const SizedBox(height: 6),
          Text('${date.day}',
              style: TextStyle(
                fontSize: 20, fontWeight: FontWeight.w800, letterSpacing: -0.5,
                color: selected ? cs.onPrimary : cs.onSurface,
              )),
        ]),
      ),
    );
  }
}

class _SlotChip extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;
  const _SlotChip({required this.label, required this.selected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return InkWell(
      borderRadius: BorderRadius.circular(14),
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 140),
        decoration: BoxDecoration(
          color: selected ? cs.primary : cs.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: selected ? cs.primary : Colors.transparent, width: 1.4),
        ),
        alignment: Alignment.center,
        child: Text(label,
            style: TextStyle(
              fontWeight: FontWeight.w700, fontSize: 14,
              color: selected ? cs.onPrimary : cs.onSurface,
            )),
      ),
    );
  }
}
